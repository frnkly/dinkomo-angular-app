<?php
/**
 *
 */
class Asset
{
    /**
     *
     */
    public static function rev($filename)
    {
        // Find manifest file.
        list($name, $ext) = explode('.', $filename);
        $manifestPath = '../assets/'. $ext .'/rev-manifest.json';
        if (!file_exists($manifestPath)) {
            return '';
        }

        // Retrieve manifest.
        if (!$manifest = json_decode(file_get_contents($manifestPath), true)) {
            return '';
        }

        // Check that asset has a mapping.
        if (!array_key_exists($filename, $manifest)) {
            return '';
        }

        return '/assets/'. $manifest[$filename];
    }
}
